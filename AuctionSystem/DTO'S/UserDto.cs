namespace AuctionSystem.Data_Transfer_Object
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = "Bidder";
        public DateTime CreatedAt { get; set; }
    }
}
