namespace AuctionSystem.Data_Transfer_Object
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public int AuctionId { get; set; }
        public int BuyerId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
