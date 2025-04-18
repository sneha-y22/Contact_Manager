async function register() {
    try {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      const res = await request("POST", "/users/register", { username, email, password });
  
      console.log("Register response:", res);
  
      if (res.message || res.error) {
        alert("Error: " + (res.message || res.error));
        return;
      }
  
      alert("Registered! Now login.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("Caught error in register(): ", err);
      alert("Registration failed: " + err.message);
    }
  }
    
  
  async function login() {
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      const res = await request("POST", "/users/login", { email, password });

      console.log("Login response:", res);
  
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken);
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      alert("Login failed: " + err.message);
      console.error(err);
    }
  }
  
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
  
  