namespace AuctionSystem.Data_Transfer_Object
{
    public class CreateTransactionDto
    {
        public int AuctionId { get; set; }
        public int BuyerId { get; set; }
        public decimal Amount { get; set; }
    }
}
