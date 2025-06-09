using AuctionSystem.Data_Transfer_Object;
using AuctionSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuctionSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _service;

        public AuctionController(IAuctionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var auctions = await _service.GetAllAsync();
            return Ok(auctions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var auction = await _service.GetByIdAsync(id);
            return auction == null ? NotFound() : Ok(auction);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAuctionDto dto)
        {
            try
            {
                var auction = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = auction.AuctionId }, auction);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION THROWN WHILE CREATING AUCTION:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Server error",
                    detail = ex.InnerException?.Message ?? ex.Message
                });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateAuctionDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
}
