import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executors;

/**
 * Wanderly - Java Mini Project HTTP Server
 * A lightweight, zero-dependency Java Web Server that serves the Wanderly
 * travel explorer frontend and handles REST API endpoints for destination data,
 * travel packages, and booking inquiries.
 */
public class WanderlyServer {

    private static final int PORT = 8080;
    private static final Path ROOT_DIR = Paths.get(".").toAbsolutePath().normalize();
    private static final Queue<Map<String, String>> ENQUIRIES = new ConcurrentLinkedQueue<>();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor()); // Java 21 Virtual Threads

        // REST API routes
        server.createContext("/api/destinations", new DestinationsApiHandler());
        server.createContext("/api/packages", new PackagesApiHandler());
        server.createContext("/api/stats", new StatsApiHandler());
        server.createContext("/api/contact", new ContactApiHandler());

        // Static file handler for HTML, CSS, JS, Images
        server.createContext("/", new StaticFileHandler());

        server.start();

        printBanner();
    }

    private static void printBanner() {
        System.out.println("==================================================================");
        System.out.println("                 WANDERLY TRAVEL PLATFORM                         ");
        System.out.println("           Java Mini Project HTTP Server (Java 21)                ");
        System.out.println("==================================================================");
        System.out.println("  * Web Platform running at: http://localhost:" + PORT + "/");
        System.out.println("  * REST API Endpoints:");
        System.out.println("    - GET  http://localhost:" + PORT + "/api/destinations");
        System.out.println("    - GET  http://localhost:" + PORT + "/api/packages");
        System.out.println("    - GET  http://localhost:" + PORT + "/api/stats");
        System.out.println("    - POST http://localhost:" + PORT + "/api/contact");
        System.out.println("  * Press Ctrl+C in console to terminate server.");
        System.out.println("==================================================================");
    }

    /**
     * Handler to serve frontend static assets (HTML, CSS, JS, JPG, SVG).
     */
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendResponse(exchange, 405, "text/plain", "Method Not Allowed");
                return;
            }

            String path = exchange.getRequestURI().getPath();
            if (path == null || path.isEmpty() || "/".equals(path)) {
                path = "/index.html";
            }

            // Prevent path traversal attacks
            Path targetFile = ROOT_DIR.resolve(path.substring(1)).normalize();
            if (!targetFile.startsWith(ROOT_DIR) || !Files.exists(targetFile) || Files.isDirectory(targetFile)) {
                sendResponse(exchange, 404, "text/html", "<h1>404 - Wanderly Page Not Found</h1><p><a href='/'>Go Home</a></p>");
                return;
            }

            String mimeType = getContentType(targetFile.getFileName().toString());
            byte[] fileBytes = Files.readAllBytes(targetFile);

            exchange.getResponseHeaders().set("Content-Type", mimeType);
            exchange.getResponseHeaders().set("Cache-Control", "no-cache");
            exchange.sendResponseHeaders(200, fileBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(fileBytes);
            }
        }
    }

    /**
     * Returns curated destinations in JSON format.
     */
    static class DestinationsApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String json = """
            [
              {"id":"goa", "name":"Goa", "category":"Coast", "tagline":"Slow mornings and colourful coastal evenings", "price":12999, "rating":4.9, "image":"images/goa.jpg"},
              {"id":"kashmir", "name":"Kashmir", "category":"Mountains", "tagline":"Lake reflections and mountain valleys", "price":24999, "rating":4.9, "image":"images/kashmir.jpg"},
              {"id":"ladakh", "name":"Ladakh", "category":"Adventure", "tagline":"High passes and wide open cinematic landscapes", "price":29999, "rating":4.8, "image":"images/ladakh.jpg"},
              {"id":"kerala", "name":"Kerala", "category":"Nature", "tagline":"Backwaters, green hills and spice trails", "price":18999, "rating":4.9, "image":"images/kerala.jpg"},
              {"id":"rajasthan", "name":"Rajasthan", "category":"Heritage", "tagline":"Forts, royal palaces and desert sunsets", "price":27999, "rating":4.9, "image":"images/rajasthan.jpg"},
              {"id":"sikkim", "name":"Sikkim", "category":"Escape", "tagline":"Quiet trails, monasteries and fresh air", "price":21999, "rating":4.8, "image":"images/sikkim.jpg"},
              {"id":"meghalaya", "name":"Meghalaya", "category":"Nature", "tagline":"Rain-washed hills and living root bridges", "price":22500, "rating":4.9, "image":"images/meghalaya.jpg"},
              {"id":"andaman", "name":"Andaman", "category":"Island", "tagline":"Clear water, coral reefs and island afternoons", "price":31999, "rating":4.9, "image":"images/andaman.jpg"}
            ]
            """;
            sendResponse(exchange, 200, "application/json", json);
        }
    }

    /**
     * Returns curated packages in JSON format.
     */
    static class PackagesApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String json = """
            [
              {"title":"Goa Escape", "duration":"3 Days / 2 Nights", "price":12999, "badge":"Popular", "inclusions":["Beach stay", "Local sightseeing", "Breakfast included"]},
              {"title":"Kashmir Discovery", "duration":"5 Days / 4 Nights", "price":24999, "badge":"Featured", "inclusions":["Houseboat stay", "Gulmarg trip", "Private cab"]},
              {"title":"Rajasthan Heritage", "duration":"6 Days / 5 Nights", "price":27999, "badge":"Cultural", "inclusions":["Heritage haveli", "City palace pass", "Desert safari"]},
              {"title":"Kerala Backwaters", "duration":"4 Days / 3 Nights", "price":18999, "badge":"Best Value", "inclusions":["Houseboat cruise", "Tea garden tour", "Ayurvedic spa"]},
              {"title":"Ladakh Adventure", "duration":"6 Days / 5 Nights", "price":29999, "badge":"Epic", "inclusions":["Pangong stay", "Khardung La pass", "Oxygen assist"]}
            ]
            """;
            sendResponse(exchange, 200, "application/json", json);
        }
    }

    /**
     * Returns live platform stats.
     */
    static class StatsApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            String json = String.format("""
            {"happyTravellers": 15420, "averageRating": 4.9, "curatedRoutes": 48, "totalEnquiriesReceived": %d}
            """, ENQUIRIES.size());
            sendResponse(exchange, 200, "application/json", json);
        }
    }

    /**
     * Handles booking enquiries submitted from frontend.
     */
    static class ContactApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendResponse(exchange, 405, "application/json", "{\"error\":\"Method not allowed\"}");
                return;
            }

            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> data = parseFormData(body);
            String refId = "WND-" + (1000 + new Random().nextInt(9000));
            data.put("bookingRef", refId);
            data.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

            ENQUIRIES.add(data);
            System.out.printf("[%s] New Booking Enquiry [%s] for destination: %s by: %s (%s)%n",
                    data.get("timestamp"), refId, data.getOrDefault("destination", "Any"),
                    data.getOrDefault("name", "Guest"), data.getOrDefault("email", "n/a"));

            String jsonResponse = String.format("""
            {"status":"success", "bookingRef":"%s", "message":"Enquiry submitted successfully! A Wanderly travel curator will connect with you."}
            """, refId);

            sendResponse(exchange, 200, "application/json", jsonResponse);
        }

        private Map<String, String> parseFormData(String body) {
            Map<String, String> map = new HashMap<>();
            if (body == null || body.trim().isEmpty()) return map;

            // Simple parser supporting basic JSON or URL-encoded form data
            if (body.startsWith("{") && body.endsWith("}")) {
                String clean = body.substring(1, body.length() - 1);
                String[] pairs = clean.split(",");
                for (String pair : pairs) {
                    String[] kv = pair.split(":", 2);
                    if (kv.length == 2) {
                        String key = kv[0].trim().replaceAll("^\"|\"$", "");
                        String val = kv[1].trim().replaceAll("^\"|\"$", "");
                        map.put(key, val);
                    }
                }
            } else {
                String[] pairs = body.split("&");
                for (String pair : pairs) {
                    String[] kv = pair.split("=", 2);
                    if (kv.length == 2) {
                        String k = URLDecoder.decode(kv[0], StandardCharsets.UTF_8);
                        String v = URLDecoder.decode(kv[1], StandardCharsets.UTF_8);
                        map.put(k, v);
                    }
                }
            }
            return map;
        }
    }

    private static void sendResponse(HttpExchange exchange, int status, String contentType, String content) throws IOException {
        byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
    }

    private static String getContentType(String filename) {
        String lower = filename.toLowerCase();
        if (lower.endsWith(".html")) return "text/html; charset=UTF-8";
        if (lower.endsWith(".css")) return "text/css; charset=UTF-8";
        if (lower.endsWith(".js")) return "application/javascript; charset=UTF-8";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".json")) return "application/json; charset=UTF-8";
        if (lower.endsWith(".txt")) return "text/plain; charset=UTF-8";
        return "application/octet-stream";
    }
}
