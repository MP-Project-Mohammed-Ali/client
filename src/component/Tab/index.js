import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./style.css";
import Nav from "../Nav/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiFillDelete } from "react-icons/ai";

import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
const MySwal = withReactContent(Swal);
const Tab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [tab, setTab] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const ROLE = process.env.REACT_APP_LAWYER_ROLE;
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  const getTab = async () => {
    console.log(params.id);
    try {
      const result = await axios.post(`${BASE_URL}/get_tab`, {
        caseID: params.id,
      });
      console.log(result.data);
      setData(result.data.filter((item) => !item.isDelete));
    } catch (error) {}
  };

  useEffect(() => {
    getTab();
  }, []);

  const createTab = async (e) => {
    e.preventDefault();
    console.log("ee");
    try {
      const result = await axios.post(
        `${BASE_URL}/createtab`,
        {
          title: e.target.title.value,
          Descraption: e.target.desc.value,
          image: images,
          caseID: params.id,
        },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      getTab();
    } catch (error) {}
  };

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          console.log(url);
          setImages([...images, url]);
        });
      }
    );
  };

  const deletTab = async (_id) => {
    try {
      const deleteresult = await axios.put(
        `${BASE_URL}/delete_tab/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      getTab();
    } catch {}
  };

  const updateTab = async (_id) => {
    const resUpdate = await axios.put(
      `${BASE_URL}/chang/case/${_id}`,
      {
        Descraption: setTab,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getTab();
  };

  useEffect(() => {
    setProgress(0);
  }, [images]);

  return (
    <>
      <Nav navb={true} />
      <div className="mainallwrapper">
        <h1 className="h1tab">تفاصيل القضية</h1>
        <div className="mainwrapertab">
          <div className="wrapertab">
            <form onSubmit={createTab} className="formtab">
              <div className="form-group">
                <label htmlFor="title" className="labeltab">
                  إضافة عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-controll"
                />
              </div>

              <div className="form-group">
                <label htmlFor="caption" className="labeltab">
                  إضافة وصف
                </label>
                <input
                  type="text"
                  name="desc"
                  id="caption"
                  className="form-controll"
                />
              </div>

              <div className="form-group file-area">
                <label htmlFor="images" className="labeltab">
                  إضافة صورة
                </label>
                <input
                  type="file"
                  name="image"
                  id="butonimagetab"
                  accept=".gif,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    uploadPictures(e);
                  }}
                />

                <div className="file-dummy">
                  <div className="success">رائع ، تم تحديد ملفاتك. استمر</div>
                  <div className="default">من فضلك اختر بعض الملفات </div>
                </div>
              </div>

              {!(progress == 0) ? (
                <div className="progress">
                  <p>يتم الرفع {progress}%</p>
                </div>
              ) : null}

              <div className="form-group">
                <button type="submit" id="tablistbutoon">
                  إرسال
                </button>
              </div>
            </form>
          </div>

          <div class="row">
            <div class="col">
              <h2>قائمتي</h2>

              <div class="tabs">
                {data.map((item, index) => (
                  <>
                    <div class="tab">
                      <input
                        type="checkbox"
                        id={`chck` + index}
                        className="input"
                      />

                      <label class="tab-label" for={`chck` + index}>
                        {item.title}
                      </label>
                      <AiFillDelete
                        id="tabdelbutoon"
                        onClick={() => {
                          deletTab(item._id);
                        }}
                      ></AiFillDelete>
                      <div class="tab-content">
                        <h4 id="destabh4">{item.Descraption}</h4>
                        {item.image.map((img) => (
                          <img src={img} width="500px" />
                        ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
