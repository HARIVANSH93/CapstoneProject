using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionSystem.Models
{
    public class Bid
    {
        public int BidId { get; set; }

        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }

        public int AuctionId { get; set; }
        public Auction Auction { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

    }
}
 