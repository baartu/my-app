"use client";
import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid"; 
import MDEditor from '@uiw/react-md-editor';
import { useLanguage } from "../contexts/LanguageContext"; 

export default function AdminPanel() {
  const { t } = useLanguage();

const MENU = [
    { key: "blog", label: t("admin.blog") },
    { key: "career", label: t("admin.career") },
    { key: "project", label: t("admin.project") },
    { key: "applications", label: t("admin.applications") },
];

function BlogList() {
  type Blog = {
    id: number;
    slug: string;
    title?: string;
    description?: string;
    content?: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    date?: string;
    tag?: string;
  };
  
  type Notification = {
    id: string;
    message: string;
    type: 'success' | 'error';
  };
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [markdownContent, setMarkdownContent] = useState("");
  const hasLoaded = useRef(false);

  // Notification fonksiyonları
  const showNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    setNotifications(prev => [...prev, newNotification]);
    
    // 3 saniye sonra otomatik kaldır
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    console.log('🟢 BlogList componenti render oldu!');
    if (hasLoaded.current) return; // Prevent double execution
    hasLoaded.current = true;
    
    setLoading(true);
    fetch("http://localhost:1337/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        const blogs = (data.data || []);
        const transformedBlogs = blogs.map((item: any) => {
          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            description: item.description,
            content: item.content,
            date: item.date,
            tag: item.tag,
          };
        });
        setBlogs(transformedBlogs);
        setError("");
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  // Blog düzenleme modalı açıldığında mevcut içeriği state'e ata
  useEffect(() => {
    if (showModal && editBlog) {
      setMarkdownContent(editBlog.content && editBlog.content[0]?.children?.[0]?.text || "");
    }
  }, [showModal, editBlog]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">Hata: {error}</div>;

  const handleEdit = (id: number) => {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      setEditBlog(blog);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditBlog(null);
  };


  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editBlog) return;

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Direkt editBlog.id kullan - zaten elimizde var!
      const blogId = editBlog.id;

      // Date formatını düzelt (YYYY-MM-DD formatında olmalı)
      const dateValue = formData.get("date") as string;
      const formattedDate = dateValue ? new Date(dateValue).toISOString().split('T')[0] : dateValue;

      const updatedBlog = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: markdownContent,
              },
            ],
          },
        ],
        date: formattedDate,
        tag: formData.get("tag") as string,
        slug: formData.get("slug") as string,
      };

      const updateUrl = `http://localhost:1337/api/blogs/${blogId}`;
      
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedBlog }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = "Blog güncellenirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Blog bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        } else if (res.status === 400) {
          errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      
      setBlogs((prev) =>
        prev.map((b) => (b.id === blogId ? { ...b, ...updatedBlog } : b))
      );
      handleCloseModal();
      
      // Başarı mesajı
      showNotification("Blog başarıyla güncellendi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };


const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isSubmitting) return; // Çift tetiklemeyi engelle
  setIsSubmitting(true);

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newBlog = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: markdownContent,
            },
          ],
        },
      ],
      date: formData.get("date") as string,
      tag: formData.get("tag") as string,
      slug: formData.get("slug") as string,
    };

    console.log("💥 Blog POST tetiklendi", new Date().toISOString());

    const res = await fetch("http://localhost:1337/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: newBlog }),
    });

    if (!res.ok) {
      let errorMessage = "Blog eklenirken bir hata oluştu.";
      
      if (res.status === 400) {
        errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
      } else if (res.status === 500) {
        errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
      }
      
      throw new Error(errorMessage);
    }

    const data = await res.json();
    const addedBlog = {
      id: data.data.id,
      ...newBlog,
    };

    setBlogs((prev) => [...prev, addedBlog]);
    setShowAddModal(false);
    form.reset();
    
    // Başarı mesajı
    showNotification("Blog başarıyla eklendi!", "success");
  } catch (err: any) {
    showNotification(err.message, "error");
  } finally {
    setIsSubmitting(false); // İşlem bitti, tekrar tetiklenebilir
    setMarkdownContent(""); // Modal kapandığında sıfırla
  }
};

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Blog silme
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu blog'u silmek istediğinizden emin misiniz?")) return;
    try {
      // Direkt ID ile sil
      const res = await fetch(`http://localhost:1337/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        let errorMessage = "Blog silinirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Blog bulunamadı.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        }
        
        throw new Error(errorMessage);
      }
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      
      // Başarı mesajı
      showNotification("Blog başarıyla silindi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div>
      {/* Notification Container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-center px-6 py-3 rounded-md shadow-lg max-w-md transform transition-all duration-300 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Bloglar</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Yeni Blog Ekle
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Başlık</th>
            <th className="py-2 px-4 border-b">Açıklama</th>
            <th className="py-2 px-4 border-b">İçerik</th>
            <th className="py-2 px-4 border-b">Tarih</th>
            <th className="py-2 px-4 border-b">Etiket</th>
            <th className="py-2 px-4 border-b">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{blog.id}</td>
              <td className="py-2 px-4 border-b">{blog.slug || "-"}</td>
              <td className="py-2 px-4 border-b">{blog.title || "-"}</td>
              <td className="py-2 px-4 border-b">{blog.description || "-"}</td>
              <td className="py-2 px-4 border-b max-w-xs truncate">
                {blog.content && blog.content.length > 0
                  ? blog.content[0].children?.[0]?.text?.slice(0, 40) +
                    (blog.content[0].children?.[0]?.text?.length > 40 ? "..." : "")
                  : "-"}
              </td>
              <td className="py-2 px-4 border-b">{blog.date || "-"}</td>
              <td className="py-2 px-4 border-b">{blog.tag || "-"}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(blog.id)}>Düzenle</button>
                <button className="text-red-600 hover:underline" onClick={() => handleDelete(blog.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Yeni Blog Ekleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => { handleCloseAddModal(); setMarkdownContent(""); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Yeni Blog Ekle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <label className="flex flex-col">
                <span className="font-medium">Başlık</span>
                <input name="title" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Açıklama</span>
                <input name="description" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">İçerik (Markdown)</span>
                <div data-color-mode="light">
                  <MDEditor
                    value={markdownContent}
                    onChange={(value) => setMarkdownContent(value || "")}
                    height={200}
                    preview="edit"
                    textareaProps={{
                      placeholder: "Markdown içeriğinizi buraya yazın...",
                      name: "content"
                    }}
                  />
                </div>
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tarih</span>
                <input name="date" type="date" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Etiket</span>
                <input name="tag" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" required />
              </label>
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {isSubmitting ? 'Ekleniyor...' : 'Ekle'}
                </button>
                <button type="button" onClick={() => { handleCloseAddModal(); setMarkdownContent(""); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Düzenle Modalı */}
      {showModal && editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => { handleCloseModal(); setMarkdownContent(""); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Blog Düzenle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <label className="flex flex-col">
                <span className="font-medium">ID</span>
                <input name="id" className="border rounded px-3 py-2 bg-gray-100" value={editBlog.id} readOnly />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Başlık</span>
                <input name="title" className="border rounded px-3 py-2" defaultValue={editBlog.title} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Açıklama</span>
                <input name="description" className="border rounded px-3 py-2" defaultValue={editBlog.description} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">İçerik (Markdown)</span>
                <div data-color-mode="light">
                  <MDEditor
                    value={markdownContent}
                    onChange={(value) => setMarkdownContent(value || "")}
                    height={200}
                    preview="edit"
                    textareaProps={{
                      placeholder: "Markdown içeriğinizi buraya yazın...",
                      name: "content"
                    }}
                  />
                </div>
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tarih</span>
                <input name="date" type="date" className="border rounded px-3 py-2" defaultValue={editBlog.date} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Etiket</span>
                <input name="tag" className="border rounded px-3 py-2" defaultValue={editBlog.tag} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" defaultValue={editBlog.slug} />
              </label>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Güncelle
                </button>
                <button type="button" onClick={() => { handleCloseModal(); setMarkdownContent(""); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CareerList() {
  type Career = {
    id: number;
    name?: string;
    type?: string;
    location?: string;
    content?: string;
    slug?: string;
  };
  
  type Notification = {
    id: string;
    message: string;
    type: 'success' | 'error';
  };
  
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editCareer, setEditCareer] = useState<Career | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const hasLoaded = useRef(false);

  // Notification fonksiyonları
  const showNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    setNotifications(prev => [...prev, newNotification]);
    
    // 3 saniye sonra otomatik kaldır
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    
    setLoading(true);
    fetch("http://localhost:1337/api/careers")
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        const careers = (data.data || []);
        const transformedCareers = careers.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            type: item.type,
            location: item.location,
            content: item.content,
            slug: item.slug,
          };
        });
        setCareers(transformedCareers);
        setError("");
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">Hata: {error}</div>;

  const handleEdit = (id: number) => {
    const career = careers.find((c) => c.id === id);
    if (career) {
      setEditCareer(career);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditCareer(null);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCareer) return;

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const careerId = editCareer.id;

      const updatedCareer = {
        name: formData.get("name") as string,
        type: formData.get("type") as string,
        location: formData.get("location") as string,
        content: formData.get("content") as string,
        slug: formData.get("slug") as string,
      };

      const updateUrl = `http://localhost:1337/api/careers/${careerId}`;
      
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedCareer }),
      });

      if (!res.ok) {
        let errorMessage = "Pozisyon güncellenirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Pozisyon bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        } else if (res.status === 400) {
          errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      
      setCareers((prev) =>
        prev.map((c) => (c.id === careerId ? { ...c, ...updatedCareer } : c))
      );
      handleCloseModal();
      
      showNotification("Pozisyon başarıyla güncellendi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const newCareer = {
        name: formData.get("name") as string,
        type: formData.get("type") as string,
        location: formData.get("location") as string,
        content: formData.get("content") as string,
        slug: formData.get("slug") as string,
      };

      const res = await fetch("http://localhost:1337/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newCareer }),
      });

      if (!res.ok) {
        let errorMessage = "Pozisyon eklenirken bir hata oluştu.";
        
        if (res.status === 400) {
          errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      const addedCareer = {
        id: data.data.id,
        ...newCareer,
      };

      setCareers((prev) => [...prev, addedCareer]);
      setShowAddModal(false);
      form.reset();
      
      showNotification("Pozisyon başarıyla eklendi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu pozisyonu silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`http://localhost:1337/api/careers/${id}`, { method: "DELETE" });
      if (!res.ok) {
        let errorMessage = "Pozisyon silinirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Pozisyon bulunamadı.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        }
        
        throw new Error(errorMessage);
      }
      setCareers((prev) => prev.filter((c) => c.id !== id));
      
      showNotification("Pozisyon başarıyla silindi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div>
      {/* Notification Container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-center px-6 py-3 rounded-md shadow-lg max-w-md transform transition-all duration-300 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Pozisyonlar</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Yeni Pozisyon Ekle
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Pozisyon Adı</th>
            <th className="py-2 px-4 border-b">Tür</th>
            <th className="py-2 px-4 border-b">Konum</th>
            <th className="py-2 px-4 border-b">İçerik</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((career) => (
            <tr key={career.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{career.id}</td>
              <td className="py-2 px-4 border-b">{career.name || "-"}</td>
              <td className="py-2 px-4 border-b">{career.type || "-"}</td>
              <td className="py-2 px-4 border-b">{career.location || "-"}</td>
              <td className="py-2 px-4 border-b max-w-xs truncate">
                {career.content?.slice(0, 40) + (career.content && career.content.length > 40 ? "..." : "") || "-"}
              </td>
              <td className="py-2 px-4 border-b">{career.slug || "-"}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(career.id)}>Düzenle</button>
                <button className="text-red-600 hover:underline" onClick={() => handleDelete(career.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Yeni Pozisyon Ekleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleCloseAddModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Yeni Pozisyon Ekle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <label className="flex flex-col">
                <span className="font-medium">Pozisyon Adı</span>
                <input name="name" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tür</span>
                <input name="type" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Konum</span>
                <input name="location" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">İçerik</span>
                <textarea name="content" className="border rounded px-3 py-2 h-32" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" required />
              </label>
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {isSubmitting ? 'Ekleniyor...' : 'Ekle'}
                </button>
                <button type="button" onClick={handleCloseAddModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Düzenle Modalı */}
      {showModal && editCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleCloseModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Pozisyon Düzenle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <label className="flex flex-col">
                <span className="font-medium">ID</span>
                <input name="id" className="border rounded px-3 py-2 bg-gray-100" value={editCareer.id} readOnly />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Pozisyon Adı</span>
                <input name="name" className="border rounded px-3 py-2" defaultValue={editCareer.name} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tür</span>
                <input name="type" className="border rounded px-3 py-2" defaultValue={editCareer.type} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Konum</span>
                <input name="location" className="border rounded px-3 py-2" defaultValue={editCareer.location} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">İçerik</span>
                <textarea name="content" className="border rounded px-3 py-2" defaultValue={editCareer.content} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" defaultValue={editCareer.slug} />
              </label>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Güncelle
                </button>
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectList() {
  type Project = {
    id: number;
    baslik?: string;
    aciklama?: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    kisaaciklama?: string;
    kapakGorseli?: any;
    galeri?: any[];
    teknolojiler?: string;
    slug?: string;
    yayinda?: boolean;
    tarih?: string;
  };
  
  type Notification = {
    id: string;
    message: string;
    type: 'success' | 'error';
  };
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const hasLoaded = useRef(false);

  // Notification fonksiyonları
  const showNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    setNotifications(prev => [...prev, newNotification]);
    
    // 3 saniye sonra otomatik kaldır
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    
    setLoading(true);
    fetch("http://localhost:1337/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        const projects = (data.data || []);
        const transformedProjects = projects.map((item: any) => {
          return {
            id: item.id,
            baslik: item.baslik,
            aciklama: item.aciklama,
            kisaaciklama: item.kisaaciklama,
            kapakGorseli: item.kapakGorseli,
            galeri: item.galeri,
            teknolojiler: item.teknolojiler,
            slug: item.slug,
            yayinda: item.yayinda,
            tarih: item.tarih,
          };
        });
        setProjects(transformedProjects);
        setError("");
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">Hata: {error}</div>;

  const handleEdit = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setEditProject(project);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProject(null);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editProject) return;

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const projectId = editProject.id;

      const updatedProject = {
        baslik: formData.get("baslik") as string,
        aciklama: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: formData.get("aciklama") as string,
              },
            ],
          },
        ],
        kisaaciklama: formData.get("kisaaciklama") as string,
        teknolojiler: formData.get("teknolojiler") as string,
        slug: formData.get("slug") as string,
        yayinda: formData.get("yayinda") === "true",
        tarih: formData.get("tarih") as string,
      };

      const updateUrl = `http://localhost:1337/api/projects/${projectId}`;
      
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedProject }),
      });

      if (!res.ok) {
        let errorMessage = "Proje güncellenirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Proje bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        } else if (res.status === 400) {
          errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, ...updatedProject } : p))
      );
      handleCloseModal();
      
      showNotification("Proje başarıyla güncellendi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const newProject = {
        baslik: formData.get("baslik") as string,
        aciklama: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: formData.get("aciklama") as string,
              },
            ],
          },
        ],
        kisaaciklama: formData.get("kisaaciklama") as string,
        teknolojiler: formData.get("teknolojiler") as string,
        slug: formData.get("slug") as string,
        yayinda: formData.get("yayinda") === "true",
        tarih: formData.get("tarih") as string,
      };

      const res = await fetch("http://localhost:1337/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newProject }),
      });

      if (!res.ok) {
        let errorMessage = "Proje eklenirken bir hata oluştu.";
        
        if (res.status === 400) {
          errorMessage = "Geçersiz veri. Lütfen tüm alanları kontrol edin.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      const addedProject = {
        id: data.data.id,
        ...newProject,
      };

      setProjects((prev) => [...prev, addedProject]);
      setShowAddModal(false);
      form.reset();
      
      showNotification("Proje başarıyla eklendi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu projeyi silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`http://localhost:1337/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        let errorMessage = "Proje silinirken bir hata oluştu.";
        
        if (res.status === 404) {
          errorMessage = "Proje bulunamadı.";
        } else if (res.status === 500) {
          errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        }
        
        throw new Error(errorMessage);
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      
      showNotification("Proje başarıyla silindi!", "success");
    } catch (err: any) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div>
      {/* Notification Container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-center px-6 py-3 rounded-md shadow-lg max-w-md transform transition-all duration-300 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Projeler</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Yeni Proje Ekle
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Başlık</th>
            <th className="py-2 px-4 border-b">Kısa Açıklama</th>
            <th className="py-2 px-4 border-b">Teknolojiler</th>
            <th className="py-2 px-4 border-b">Yayında</th>
            <th className="py-2 px-4 border-b">Tarih</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{project.id}</td>
              <td className="py-2 px-4 border-b">{project.baslik || "-"}</td>
              <td className="py-2 px-4 border-b max-w-xs truncate">
                {project.kisaaciklama?.slice(0, 40) + (project.kisaaciklama && project.kisaaciklama.length > 40 ? "..." : "") || "-"}
              </td>
              <td className="py-2 px-4 border-b">{project.teknolojiler || "-"}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded text-xs ${project.yayinda ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {project.yayinda ? 'Evet' : 'Hayır'}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{project.tarih || "-"}</td>
              <td className="py-2 px-4 border-b">{project.slug || "-"}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(project.id)}>Düzenle</button>
                <button className="text-red-600 hover:underline" onClick={() => handleDelete(project.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Yeni Proje Ekleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleCloseAddModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Yeni Proje Ekle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleAdd}>
              <label className="flex flex-col">
                <span className="font-medium">Başlık</span>
                <input name="baslik" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Kısa Açıklama</span>
                <input name="kisaaciklama" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Açıklama</span>
                <textarea name="aciklama" className="border rounded px-3 py-2 h-32" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Teknolojiler</span>
                <input name="teknolojiler" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Yayında</span>
                <select name="yayinda" className="border rounded px-3 py-2" required>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tarih</span>
                <input name="tarih" type="date" className="border rounded px-3 py-2" required />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" required />
              </label>
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {isSubmitting ? 'Ekleniyor...' : 'Ekle'}
                </button>
                <button type="button" onClick={handleCloseAddModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Düzenle Modalı */}
      {showModal && editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleCloseModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Proje Düzenle</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <label className="flex flex-col">
                <span className="font-medium">ID</span>
                <input name="id" className="border rounded px-3 py-2 bg-gray-100" value={editProject.id} readOnly />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Başlık</span>
                <input name="baslik" className="border rounded px-3 py-2" defaultValue={editProject.baslik} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Kısa Açıklama</span>
                <input name="kisaaciklama" className="border rounded px-3 py-2" defaultValue={editProject.kisaaciklama} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Açıklama</span>
                <textarea name="aciklama" className="border rounded px-3 py-2" defaultValue={editProject.aciklama && editProject.aciklama[0]?.children?.[0]?.text} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Teknolojiler</span>
                <input name="teknolojiler" className="border rounded px-3 py-2" defaultValue={editProject.teknolojiler} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Yayında</span>
                <select name="yayinda" className="border rounded px-3 py-2" defaultValue={editProject.yayinda?.toString()}>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Tarih</span>
                <input name="tarih" type="date" className="border rounded px-3 py-2" defaultValue={editProject.tarih} />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Slug</span>
                <input name="slug" className="border rounded px-3 py-2" defaultValue={editProject.slug} />
              </label>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Güncelle
                </button>
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

  const [selected, setSelected] = useState("blog");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">{t("admin.title")}</h2>
        <nav className="flex flex-col gap-2">
          {MENU.map((item) => (
            <button
              key={item.key}
              className={`text-left px-4 py-2 rounded transition font-medium ${
                selected === item.key
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => setSelected(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {selected === "blog" && <BlogList />}
        {selected === "career" && <CareerList />}
        {selected === "project" && <ProjectList />}
        {selected === "applications" && <div>{t("admin.applications")} buraya gelecek.</div>}
      </main>
    </div>
  );
} 