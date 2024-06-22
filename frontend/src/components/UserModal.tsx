import React from "react";
import { useRouter } from "next/navigation";

interface UserModalProps {
  userDetails: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userDetails, onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <p>
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;
