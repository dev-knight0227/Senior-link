import ManageList from "@/components/manageList/ManageList";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SeniorLink | Admin Page",
  description:
    "Find the perfect care solution for your loved ones. Search through verified care homes, caregivers, and support services.",
};

export default function SearchCare() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              border: "1px solid #206645",
              padding: "16px",
              color: "#206645",
            },
            iconTheme: {
              primary: "#206645",
              secondary: "#F0FDF4",
            },
          },
          error: {
            style: {
              border: "1px solid #DC2626",
              padding: "16px",
              color: "#DC2626",
            },
            iconTheme: {
              primary: "#DC2626",
              secondary: "#FEE2E2",
            },
          },
        }}
      />
      <ManageList />
    </>
  );
}
