namespace AuctionSystem.Data_Transfer_Object
{
    public class CreateAuctionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal StartingPrice { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? ImageBase64 { get; set; } 
        public int? CategoryId { get; set; }
        public int CreatedById { get; set; }
    }
}
