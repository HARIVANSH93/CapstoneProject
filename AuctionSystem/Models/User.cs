using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace AuctionSystem.Models
{
    public class User
    {
     public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Role { get; set; } = "Bidder";
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<Auction> CreatedAuctions { get; set; } = new List<Auction>();
    public ICollection<Bid> Bids { get; set; } = new List<Bid>();


        public ICollection<Notification> Notifications { get; set; }

    }
}
