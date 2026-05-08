export const getGuestId = () => {

  let guestId = localStorage.getItem("guest_id");

  if (guestId) return guestId;

  guestId =
    "GUEST-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000000);

  localStorage.setItem("guest_id", guestId);

  return guestId;
};