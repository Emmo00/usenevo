// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract CryptoInvoice {
    address public owner;
    IERC20 public usdc;
    uint256 public feePercentage = 2; // 2% fee for the contract owner

    enum InvoiceStatus {
        Pending,
        Paid,
        Expired,
        Deleted
    }

    struct Invoice {
        uint256 id;
        string title;
        string clientName;
        string[] items;
        uint256[] prices;
        uint256 total;
        address creator;
        uint256 dueDate;
        InvoiceStatus status;
    }

    mapping(uint256 => Invoice) public invoices;
    uint256 public invoiceCount = 0;

    mapping(address => uint256[]) private userInvoices;

    event InvoiceCreated(
        uint256 indexed id,
        address indexed creator,
        uint256 total,
        uint256 dueDate
    );
    event InvoicePaid(
        uint256 indexed id,
        address indexed payer,
        uint256 amount,
        uint256 fee
    );
    event InvoiceDeleted(
        uint256 indexed id,
        address indexed deleter
    );

    constructor(address _usdc) {
        owner = msg.sender;
        usdc = IERC20(_usdc);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function createInvoice(
        string memory _title,
        string memory _clientName,
        string[] memory _items,
        uint256[] memory _prices,
        address _creator,
        uint256 _dueDate
    ) external {
        require(_items.length == _prices.length, "Items and prices length mismatch");
        require(_dueDate > block.timestamp, "Invalid due date");

        uint256 total = 0;
        for (uint256 i = 0; i < _prices.length; i++) {
            total += _prices[i];
        }

        invoiceCount++;
        invoices[invoiceCount] = Invoice({
            id: invoiceCount,
            title: _title,
            clientName: _clientName,
            items: _items,
            prices: _prices,
            total: total,
            creator: _creator,
            dueDate: _dueDate,
            status: InvoiceStatus.Pending
        });

        userInvoices[_creator].push(invoiceCount);

        emit InvoiceCreated(invoiceCount, msg.sender, total, _dueDate);
    }

    function getInvoice(
        uint256 _id
    )
        external
        view
        returns (
            string memory title,
            string memory clientName,
            string[] memory items,
            uint256[] memory prices,
            uint256 total,
            address creator,
            uint256 dueDate,
            InvoiceStatus status
        )
    {
        Invoice storage invoice = invoices[_id];
        return (
            invoice.title,
            invoice.clientName,
            invoice.items,
            invoice.prices,
            invoice.total,
            invoice.creator,
            invoice.dueDate,
            invoice.status
        );
    }

    function getInvoiceStatus(
        uint256 _id
    ) external view returns (InvoiceStatus) {
        return invoices[_id].status;
    }

    function payInvoice(uint256 _id) external {
        Invoice storage invoice = invoices[_id];
        require(invoice.status == InvoiceStatus.Pending, "Invoice not payable");
        require(block.timestamp <= invoice.dueDate, "Invoice expired");

        uint256 fee = (invoice.total * feePercentage) / 100;
        uint256 amountToCreator = invoice.total - fee;

        require(
            usdc.transferFrom(msg.sender, address(this), invoice.total),
            "Payment failed"
        );
        require(
            usdc.transfer(invoice.creator, amountToCreator),
            "Creator payment failed"
        );
        require(
            usdc.transfer(owner, fee),
            "Fee payment failed"
        );

        invoice.status = InvoiceStatus.Paid;
        emit InvoicePaid(_id, msg.sender, invoice.total, fee);
    }

    function updateFeePercentage(uint256 _newFee) external onlyOwner {
        require(_newFee <= 10, "Fee too high");
        feePercentage = _newFee;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner, balance), "Withdrawal failed");
    }

    function getUserInvoiceCount(address user) external view returns (uint256) {
        return userInvoices[user].length;
    }

    function getUserPendingInvoiceCount(address user) external view returns (uint256 count) {
        uint256[] storage invoiceIds = userInvoices[user];
        for (uint256 i = 0; i < invoiceIds.length; i++) {
            if (invoices[invoiceIds[i]].status == InvoiceStatus.Pending) {
                count++;
            }
        }
    }

    function getUserInvoices(address user) external view returns (Invoice[] memory) {
        uint256[] storage invoiceIds = userInvoices[user];
        uint256 length = invoiceIds.length;
        Invoice[] memory userInvoiceList = new Invoice[](length);
        for (uint256 i = 0; i < length; i++) {
            if (invoices[invoiceIds[i]].status != InvoiceStatus.Deleted) userInvoiceList[i] = invoices[invoiceIds[i]];
        }
        return userInvoiceList;
    }

    function deleteInvoice(uint256 _id) external {
        Invoice storage invoice = invoices[_id];
        require(invoice.creator == msg.sender, "Only invoice creator can delete");
        require(invoice.status == InvoiceStatus.Pending, "Only pending invoices can be deleted");

        invoice.status = InvoiceStatus.Deleted;

        uint256[] storage invoiceIds = userInvoices[msg.sender];
        for (uint256 i = 0; i < invoiceIds.length; i++) {
            if (invoiceIds[i] == _id) {
                invoiceIds[i] = invoiceIds[invoiceIds.length - 1];
                invoiceIds.pop();
                break;
            }
        }

        emit InvoiceDeleted(_id, msg.sender);
    }
}
