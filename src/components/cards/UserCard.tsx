/* eslint-disable @next/next/no-img-element */
function UserCard() {
  return (
    <div className="relative rounded-full w-10 h-10 cursor-pointer overflow-hidden">
      <img
        src="https://ableproadmin.com/assets/images/user/avatar-2.jpg"
        alt="user"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default UserCard;

export function UserDropdown() {
  return <>POPOVER</>;
}
