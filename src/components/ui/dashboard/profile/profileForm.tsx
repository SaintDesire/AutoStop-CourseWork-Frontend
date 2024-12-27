import React, { useState } from "react";

// Интерфейс для данных пользователя
interface UserData {
  user_id?: number;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string; // Здесь будет храниться Base64 строка
}

// Интерфейс для пропсов
interface ProfileFormProps {
  userData: UserData;
  onSubmit: (updatedData: UserData) => void; // Callback для сохранения изменений
}

export default function ProfileForm({ userData, onSubmit }: ProfileFormProps): JSX.Element {
  const [formData, setFormData] = useState<UserData>(userData);
  const [editPassword, setEditPassword] = useState(false); // Состояние для редактирования пароля

  // Обработчик изменения текстовых полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Обработчик загрузки файла
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData((prevData) => ({
            ...prevData,
            avatar: reader.result?.toString(), // Сохраняем Base64 строку
          }));
        }
      };
      reader.readAsDataURL(file); // Читаем файл как Base64
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Вызываем callback с обновлёнными данными
  };

  // Обработчик кнопки для редактирования пароля
  const handleEditPasswordClick = () => {
    if (editPassword) {
      // Если редактирование пароля отменяется, очищаем поля
      setFormData((prevData) => ({
        ...prevData,
        password: "",        // Очищаем поле пароля
        confirmPassword: "", // Очищаем поле подтверждения пароля
      }));
    }
    setEditPassword((prev) => !prev); // Меняем состояние редактирования пароля
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="formGrid">
        <div className="formGroup">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Full Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled // Email не изменяемый
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter New Password"
            value={formData.password || ""}
            onChange={handleChange}
            disabled={!editPassword} // Поле для пароля доступно только если editPassword = true
          />
        </div>
        {editPassword && (
          <div className="formGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword || ""}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>
        )}
        <button
          type="button"
          className="editBtn"
          onClick={handleEditPasswordClick} // Показать/скрыть поле для пароля и очистить поля
        >
          {editPassword ? "Cancel" : "Edit Password"}
        </button>
        <div className="formGroup">
          <label htmlFor="avatar">Avatar</label>
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="User Avatar"
              style={{ width: "100px", height: "100px", marginBottom: "10px" }}
            />
          )}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFileUpload} // Обработчик загрузки файла
          />
        </div>
      </div>
      <button className="editBtn" type="submit">
        Save Changes
      </button>
    </form>
  );
}
