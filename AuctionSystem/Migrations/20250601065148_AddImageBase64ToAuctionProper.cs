using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddImageBase64ToAuctionProper : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageBase64",
                table: "Auctions",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64",
                table: "Auctions");
        }
    }
}
