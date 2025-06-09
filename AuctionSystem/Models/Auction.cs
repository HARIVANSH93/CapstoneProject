

namespace AuctionSystem.Models
{
    public class Auction
    {
        public int AuctionId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public decimal StartingPrice { get; set; }
        public decimal? CurrentBid { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

        public int CreatedById { get; set; }
        public User CreatedBy { get; set; } = null!;
        public ICollection<Bid> Bids { get; set; } = new List<Bid>();

        public string? ImageBase64 { get; set; } 

    }
}
