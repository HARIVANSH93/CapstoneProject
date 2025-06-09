namespace AuctionSystem.Data_Transfer_Object
{
    public class CreateBidDto
    {
        public decimal BidAmount { get; set; }
        public int AuctionId { get; set; }
        public int UserId { get; set; }
    }
}
