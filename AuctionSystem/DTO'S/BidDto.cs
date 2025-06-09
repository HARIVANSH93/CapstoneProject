namespace AuctionSystem.Data_Transfer_Object
{
    public class BidDto
    {
        public int BidId { get; set; }
        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }
        public int AuctionId { get; set; }
        public int UserId { get; set; }
    }
}
