using AuctionSystem.Data_Transfer_Object;

namespace AuctionSystem.Services
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetAllAsync();
        Task<IEnumerable<NotificationDto>> GetByUserIdAsync(int userId);
        Task<NotificationDto> CreateAsync(CreateNotificationDto dto);
        Task<bool> MarkAsReadAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
