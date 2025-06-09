namespace AuctionSystem.Data_Transfer_Object
{
    public class CreateNotificationDto
    {
        public string Message { get; set; } = null!;
        public int UserId { get; set; }
    }
}
