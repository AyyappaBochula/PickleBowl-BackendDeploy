import { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";

export default function Profile() {

  const [user, setUser] = useState(null);

  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [form, setForm] = useState({});

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  // GET USER
  const localUser = JSON.parse(
    localStorage.getItem("user")
  );

  // ACCESS TOKEN
  const accessToken = localUser?.access;

  // LOAD PROFILE
  useEffect(() => {

    fetchProfile();

  }, []);

  // FETCH PROFILE
  const fetchProfile = async () => {

    try {

      const response = await fetch(
        "/api/customers/profile/",
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.status) {

        setUser(data.data);

        setForm(data.data);

      } else {

        alert(data.message || "Failed to load profile");

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // UPDATE PROFILE
  const saveProfile = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "/api/customers/profile/",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            name: form.name,
            email: form.email,
            street: form.street,
            village: form.village,
            district: form.district,
            state: form.state,
            pincode: form.pincode,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {

        setUser(data.data);

        setForm(data.data);

        setEdit(false);

        alert("Profile updated successfully");

      } else {

        alert(data.message || "Update failed");

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    } finally {

      setLoading(false);

    }
  };

  // CHANGE PASSWORD
  const changePassword = async () => {

    if (
      !passwords.old ||
      !passwords.new ||
      !passwords.confirm
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {

      setPasswordLoading(true);

      const response = await fetch(
        "/api/customers/change-password/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            old_password: passwords.old,
            new_password: passwords.new,
            confirm_password: passwords.confirm,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {

        alert("Password updated successfully");

        setPasswords({
          old: "",
          new: "",
          confirm: "",
        });

      } else {

        alert(
          data.message ||
          "Password update failed"
        );

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    } finally {

      setPasswordLoading(false);

    }
  };

  // LOADING
  if (!user) {

    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  }

  return (
    <section className="bg-cream min-h-screen py-10">

      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-soft p-6 flex items-center gap-5 mb-6">

          {/* AVATAR */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

            <User className="text-primary w-10 h-10" />

          </div>

          {/* NAME */}
          <div>

            <h2 className="text-xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500">
              +91 {user.mobile}
            </p>

          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setEdit(!edit)}
            className="ml-auto bg-primary text-white px-4 py-2 rounded-full text-sm"
          >
            {edit ? "Cancel" : "Edit"}
          </button>

        </div>

        {/* PROFILE DETAILS */}
        <div className="bg-white rounded-3xl shadow-soft p-6 mb-6">

          <h3 className="font-semibold mb-4 text-gray-800">
            Personal Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {[
              { label: "Full Name", name: "name" },
              { label: "Mobile", name: "mobile" },
              { label: "Email", name: "email" },
              { label: "Street", name: "street" },
              { label: "Village / City", name: "village" },
              { label: "District", name: "district" },
              { label: "State", name: "state" },
              { label: "Pincode", name: "pincode" },
            ].map((field) => (

              <div key={field.name}>

                <label className="text-xs text-gray-500">
                  {field.label}
                </label>

                {edit ? (

                  <input
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    disabled={field.name === "mobile"}
                    className="
                      w-full mt-1 px-3 py-2
                      border rounded-xl text-sm
                      focus:outline-none focus:border-primary
                    "
                  />

                ) : (

                  <p className="text-sm font-medium mt-1 text-gray-800">
                    {user[field.name] || "-"}
                  </p>

                )}

              </div>

            ))}

          </div>

          {/* SAVE BUTTON */}
          {edit && (

            <button
              onClick={saveProfile}
              disabled={loading}
              className="mt-6 bg-primary text-white px-6 py-2 rounded-full"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          )}

        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white rounded-3xl shadow-soft p-6">

          <div className="flex items-center gap-2 mb-4">

            <Lock className="w-5 h-5 text-primary" />

            <h3 className="font-semibold text-gray-800">
              Change Password
            </h3>

          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="password"
              placeholder="Old Password"
              value={passwords.old}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  old: e.target.value,
                })
              }
              className="input"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  new: e.target.value,
                })
              }
              className="input"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirm: e.target.value,
                })
              }
              className="input"
            />

          </div>

          <button
            onClick={changePassword}
            disabled={passwordLoading}
            className="mt-5 bg-primary text-white px-6 py-2 rounded-full"
          >
            {passwordLoading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
            outline: none;
            font-size: 14px;
          }

          .input:focus {
            border-color: #f97316;
          }
        `}
      </style>

    </section>
  );
}
