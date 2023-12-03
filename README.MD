# Instagram Hashtag Search Tool

https://github.com/MfundoVala/instascrape/assets/71990245/a122717f-1306-40ed-bd13-c51dde16ab30


## Objective
Develop a web-based tool that empowers users to explore Instagram posts associated with specific hashtags. The tool seamlessly integrates the Apify API, persists results in a Laravel-backed database, and offers a user-friendly React-based frontend. Additionally, a machine-to-machine API endpoint is implemented for programmatic access to search functionality.

## Features

### User Interface
1. **Search Box:**
   - A user-friendly search box allows users to input hashtags.

2. **Display Area:**
   - The interface includes a display area showcasing search results in a visually appealing React-based grid or list format.

### Back-End Development (Laravel)
- Results from hashtag searches are efficiently stored in a Laravel-supported database.
- A machine-to-machine API endpoint is thoughtfully implemented, offering seamless programmatic access to search functionality.

### Data Presentation (React)
- Instagram content is gracefully presented using React components, providing an immersive experience for users.

## How to Use

### Web Interface (React)
1. **Clone the Repository:**
   - Clone this repository to your local machine using the following command:
     ```bash
     git clone https://github.com/your-username/instagram-hashtag-tool.git
     ```

2. **Install Dependencies:**
   - Navigate to the project root directory and install the dependencies for both the React frontend and Laravel backend:
     ```bash
     cd instagram-hashtag-tool
     cd client && npm install
     cd ../server && composer install
     ```
     

3. **Database Configuration (Laravel):**
   - Configure the database connection in Laravel by copying the `.env.example` file to a new file named `.env` and updating the necessary database credentials according to your database setup.

4. **Apify API Credentials:**
   - Acquire Apify API credentials (Apify Token at apify.com) and update them in the appropriate configuration files in the Laravel backend (APIFY_TOKEN).
   - If you cannot get credentials privately request them the .env file from me.

5. **Run the Application:**
   - Start the React frontend and Laravel backend. In separate terminal windows:
     - For React:
       ```bash
       cd client && npm start
       ```
     - For Laravel:
       ```bash
       cd backend && php artisan serve
       ```

6. **Access the Tool:**
   - Open your preferred browser and navigate to `http://localhost:3000` to access the Instagram Hashtag Search Tool.

### API Endpoint (Laravel)
- Leverage the Laravel-backed API endpoint for machine-to-machine calls.
- Make requests to the API and programmatically retrieve search results.
-- **Endpoints:**
-- [localhost]/api/getHashtagPosts - Returns and array of previously queried posts stored in Database 
-- [localhost]/api/scrapePostsByHashtag - Starts an Apify actor run to scrape posts by provided hashtag and returns an array of post information. 

#NB:- Make sure your server is running at PORT 8000 ie http://127.0.0.1:8000/

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Laravel, PHP
- **Database:** MySQL
- **API:** Apify API for scrapiing and fetching posts

## Contributions
Contributions are encouraged! Feel free to submit issues or pull requests to enhance the functionality of the tool.

## License
This project is licensed under the [MIT License](LICENSE).


