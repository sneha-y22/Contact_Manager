window.onload = () => {
    const page = location.pathname;
    if (page.includes("dashboard")) loadContacts();
    if (page.includes("contact-form")) loadFormData();
  };
  
  async function loadContacts() {
    const res = await request("GET", "/contacts");
    const container = document.getElementById("contacts");
    container.innerHTML = "";
    res.forEach(contact => {
      const div = document.createElement("div");
      div.className = "contact-card";
      div.innerHTML = `
        <strong>${contact.name}</strong><br/>
        ${contact.email}<br/>
        ${contact.phone}<br/>
        <button onclick="editContact('${contact._id}')">Edit</button>
        <button onclick="deleteContact('${contact._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  }
  
  function editContact(id) {
    localStorage.setItem("editId", id);
    window.location.href = "contact-form.html";
  }
  
  async function deleteContact(id) {
    await request("DELETE", `/contacts/${id}`);
    loadContacts();
  }
  
  async function loadFormData() {
    const id = localStorage.getItem("editId");
    if (id) {
      const contact = await request("GET", `/contacts/${id}`);
      document.getElementById("name").value = contact.name;
      document.getElementById("email").value = contact.email;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("formTitle").innerText = "Edit Contact";
    }
  }
  
  async function submitContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const id = localStorage.getItem("editId");
  
    try {
      if (id) {
        await request("PUT", `/contacts/${id}`, { name, email, phone });
        localStorage.removeItem("editId");
      } else {
        const res = await request("POST", "/contacts", { name, email, phone });
  
        // Check for errors in response
        if (res.message) {
          alert("Error: " + res.message);
          return;
        }
      }
  
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error("Submit Contact Error: ", err);
      alert("Something went wrong while saving the contact.");
    }
  }