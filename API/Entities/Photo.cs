using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string url { get; set; }
    public string Url { get; internal set; }
    public bool isMain { get; set; }
    public bool IsMain { get; internal set; }
    public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
