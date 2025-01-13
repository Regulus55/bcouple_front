import React from "react";



const UpdateImage= ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="profileImg"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UpdateImage;