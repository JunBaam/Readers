import React, { useState } from "react";
import { Upload, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "../../utils/base64";
import { useAppContext } from "../../store";
import { axiosInstance } from "../../utils/api";

function ProfileEdit({ changeToFalse, profile }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });

  // fileList 가 인자로 넘어온다
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const apiUrl = `http://15.165.223.171:8080/api/user/${profile.id}/`;
  const handleEdit = async fieldValues => {
    const {
      avatar: { fileList },
    } = fieldValues;
    // js APi
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("avatar", file.originFileObj);
    });

    try {
      const response = await axiosInstance.patch(apiUrl, formData, {
        headers,
      });

      console.log("수정성공:", response);

      window.location.reload();
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handlePreviewPhoto = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  return (
    <>
      <div className="profile_card">
        <Form onFinish={handleEdit}>
          <Form.Item
            name="avatar"
            style={{ marginLeft: "21px" }}
            rules={[{ required: true, message: "사진을 입력해주세요." }]}
            hasFeedback
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => {
                return false;
              }}
              onChange={handleUploadChange}
              onPreview={handlePreviewPhoto}
            >
              {/* 사진 하나 업로드시 추가 부분 삭제  */}
              {fileList.length > 0 ? null : <PlusOutlined />}
            </Upload>
          </Form.Item>
          <Modal
            visible={previewPhoto.visible}
            footer={null}
            onCancel={() => setPreviewPhoto({ visible: false })}
          >
            <img
              src={previewPhoto.base64}
              style={{ width: "100%" }}
              alt="Preview"
            />
          </Modal>

          <button
            // onClick={() => handleEdit({profile})}
            type="submit"
            className="profile_edit_btn"
          >
            수정완료!
          </button>
          <button
            onClick={() => changeToFalse()}
            className="profile_cancel_btn"
          >
            취소하기
          </button>
        </Form>
      </div>
    </>
  );
}
export default ProfileEdit;
