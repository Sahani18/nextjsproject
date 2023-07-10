"use client";
import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-gray-900 h-screen text-center justify-center text-white mx-auto">
      <Toaster />
      <div className="justify-center">
        <p className="text-center">User Profile</p>
        <button
          onClick={logout}
          className="p-2 bg-orange-500 text-black mt-5 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
