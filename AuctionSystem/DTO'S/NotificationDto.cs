namespace AuctionSystem.Data_Transfer_Object
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsRead { get; set; }
        public int UserId { get; set; }
    }
}
