using AuctionSystem.Data;
using AuctionSystem.Data_Transfer_Object;
using AuctionSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly ApplicationDbContext _context;

        public AuctionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AuctionDto>> GetAllAsync()
        {
            return await _context.Auctions
                .Select(a => new AuctionDto
                {
                    AuctionId = a.AuctionId,
                    Title = a.Title,
                    Description = a.Description,
                    StartingPrice = a.StartingPrice,
                    CurrentBid = a.CurrentBid,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    CategoryId = a.CategoryId,
                    CreatedById = a.CreatedById,
                    ImageBase64 = a.ImageBase64
                }).ToListAsync();
        }

        public async Task<AuctionDto?> GetByIdAsync(int id)
        {
            var a = await _context.Auctions.FindAsync(id);
            if (a == null) return null;

            return new AuctionDto
            {
                AuctionId = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                StartingPrice = a.StartingPrice,
                CurrentBid = a.CurrentBid,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                CategoryId = a.CategoryId,
                CreatedById = a.CreatedById,
                ImageBase64 = a.ImageBase64
            };
        }

        public async Task<AuctionDto> CreateAsync(CreateAuctionDto dto)
        {
            var auction = new Auction
            {
                Title = dto.Title,
                Description = dto.Description,
                StartingPrice = dto.StartingPrice,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                CategoryId = dto.CategoryId,
                CreatedById = dto.CreatedById,
                ImageBase64 = dto.ImageBase64,
                CurrentBid = null
            };

            _context.Auctions.Add(auction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(" ERROR SAVING AUCTION:");
                Console.WriteLine(ex.ToString());
                throw;
            }

            return new AuctionDto
            {
                AuctionId = auction.AuctionId,
                Title = auction.Title,
                Description = auction.Description,
                StartingPrice = auction.StartingPrice,
                CurrentBid = auction.CurrentBid,
                StartTime = auction.StartTime,
                EndTime = auction.EndTime,
                CategoryId = auction.CategoryId,
                CreatedById = auction.CreatedById,
                ImageBase64 = auction.ImageBase64
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null) return false;

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<AuctionDto?> UpdateAsync(int id, CreateAuctionDto dto)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null) return null;

            auction.Title = dto.Title;
            auction.Description = dto.Description;
            auction.StartingPrice = dto.StartingPrice;
            auction.StartTime = dto.StartTime;
            auction.EndTime = dto.EndTime;
            auction.CategoryId = dto.CategoryId;
            auction.ImageBase64 = dto.ImageBase64;

            await _context.SaveChangesAsync();

            return new AuctionDto
            {
                AuctionId = auction.AuctionId,
                Title = auction.Title,
                Description = auction.Description,
                StartingPrice = auction.StartingPrice,
                CurrentBid = auction.CurrentBid,
                StartTime = auction.StartTime,
                EndTime = auction.EndTime,
                CategoryId = auction.CategoryId,
                CreatedById = auction.CreatedById,
                ImageBase64 = auction.ImageBase64
            };
        }
    }
}
