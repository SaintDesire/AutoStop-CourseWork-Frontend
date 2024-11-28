"use client"

import Login from "@/app/(auth)/login/page";
import Register from "@/app/(auth)/signup/page";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";

let loginWindow: HTMLCollectionOf<Element> | null = null;
let signupWindow: HTMLCollectionOf<Element> | null = null;

const closeModal = () => {
    const modalWindow = document.getElementsByClassName("modal-overlay")
    modalWindow[0].classList.add("hidden-window")
}

const changeVisibility = (isActive: boolean) => {
    if (loginWindow?.length && signupWindow?.length) {
      const loginElement = loginWindow[0];
      const signupElement = signupWindow[0];
  
      if (isActive) {
        loginElement.classList.add("hidden-window");
        signupElement.classList.remove("hidden-window");
      } else {
        loginElement.classList.remove("hidden-window");
        signupElement.classList.add("hidden-window");
      }
    }
  };

export default function Modal() {
    loginWindow = document.getElementsByClassName('login-window');
    signupWindow = document.getElementsByClassName('signup-window');
    
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        loginWindow = document.getElementsByClassName("login-window");
        signupWindow = document.getElementsByClassName("signup-window");
    
        if (signupWindow?.length) {
          signupWindow[0].classList.add("hidden-window");
        }
      }, []);
    
    return (
        <div className="modal-overlay hidden-window">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>
                    Close
                </button>
                <div style={{width: "100%"}}>
                  <div className="modals-buttons-area">
                      <button className="modal-buttons-auth" onClick={() => {
                          changeVisibility(isActive);
                          setIsActive(!isActive);
                      }}>Войти</button>
                      <button className="modal-buttons-auth" onClick={() => {
                          changeVisibility(isActive);
                          setIsActive(!isActive);
                      }}>Зарегистрироваться</button>
                  </div>
                  <Login/>
                  <Register/>
                </div>
            </div>
        </div>
    )
}