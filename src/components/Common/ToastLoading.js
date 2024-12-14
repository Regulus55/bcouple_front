import React from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastLoading = () => {
  const showSuccessToast = () => {
    toast.success("성공 메시지!")
  }

  const showErrorToast = () => {
    toast.error("에러 메시지!")
  }

  return (
    <div className="p-4 space-y-4">
      {/* <button
        onClick={showSuccessToast}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        성공 메시지
      </button>
      <button
        onClick={showErrorToast}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        에러 메시지
      </button> */}
      <ToastContainer
        position="top-center" // 메시지 위치
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false} // 진행바 표시 여부
        newestOnTop={true} // 새로운 메시지를 위에 표시
        closeOnClick // 클릭 시 닫힘
        pauseOnHover // 마우스를 올리면 닫힘 일시 정지
        draggable // 드래그로 위치 변경 가능
      />
    </div>
  )
}

export default ToastLoading
