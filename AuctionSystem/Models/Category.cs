using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AuctionSystem.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public ICollection<Auction> Auctions { get; set; } = new List<Auction>();


    }
}
