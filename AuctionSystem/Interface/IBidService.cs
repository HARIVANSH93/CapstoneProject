using AuctionSystem.Data_Transfer_Object;

namespace AuctionSystem.Services
{
    public interface IBidService
    {
        Task<BidDto> PlaceBidAsync(CreateBidDto dto);

        Task<IEnumerable<BidDto>> GetAllAsync();
        Task<BidDto?> GetByIdAsync(int id);
        Task<BidDto> CreateAsync(CreateBidDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
