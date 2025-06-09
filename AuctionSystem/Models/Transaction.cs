using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionSystem.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public int AuctionId { get; set; }
        public int BuyerId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }

        // Navigation
        public Auction Auction { get; set; }
        public User Buyer { get; set; }



    }
}
