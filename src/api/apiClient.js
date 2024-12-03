const apiClient = {
  baseURL: "https://lessonsapp-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },

  async request(method, url, data = null) {
    const options = {
      method: method,
      headers: this.headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },

  // A GET request method
  async get(url) {
    return this.request("GET", url);
  },

  // A POST request method
  async post(url, data) {
    return this.request("POST", url, data);
  },
};

export default apiClient;
