using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoSession912.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNombreToSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "Sessions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "Sessions");
        }
    }
}
