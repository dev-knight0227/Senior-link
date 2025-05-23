import AddList from "@/components/addList/addList"

export const metadata = {
  title: "SeniorLink | Add List",
  description:
    "Find the perfect care solution for your loved ones. Search through verified care homes, caregivers, and support services.",
}

export default function AddListPage({params}) {
  const {category} = params;
  return <AddList category = {category} />
}