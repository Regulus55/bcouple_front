import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getProfileInfo = async () => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = "http://localhost/api/auth"
    const res = await axios.get(url, config)
    // console.log("profile res", res)
    return res.data.data
  } catch (e) {
    console.log(e)
  }
}

const useProfile = () => {
  return useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => getProfileInfo(),
  })
}

export default useProfile
