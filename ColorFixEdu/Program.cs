using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", async context =>
{
    context.Response.Redirect("/index.html");
});

app.MapPost("/api/chat", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var userMessage = await reader.ReadToEndAsync();

    var apiKey = builder.Configuration["OpenAI:ApiKey"];

    var requestBody = new
    {
        model = "gpt-3.5-turbo",
        messages = new[]
        {
            new { role = "system", content = "Renk körlüğü hakkında bilgi veren ve kullanıcıya yardımcı olan bir asistansın." },
            new { role = "user", content = userMessage }
        }
    };

    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
    var response = await client.PostAsync("https://api.openai.com/v1/chat/completions", content);

    var responseString = await response.Content.ReadAsStringAsync();
    var json = JsonDocument.Parse(responseString);
    var reply = json.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

    context.Response.ContentType = "application/json";
    await context.Response.WriteAsync(JsonSerializer.Serialize(new { response = reply }));
});

app.Run();
