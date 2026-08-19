'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './Admin.module.css';

interface ResourceFile {
  originalPath: string;
  name: string;
  subject: string;
  classVal: string;
  year: string;
}

export default function AdminPage() {
  const [files, setFiles] = useState<ResourceFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Status states
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/list');
      const data = await res.json();
      if (data.files && Array.isArray(data.files)) {
        const parsedFiles = data.files.map((filePath: string): ResourceFile => {
          const parts = filePath.split('/');
          let subject = 'General';
          let classVal = 'All';
          let year = 'N/A';
          let name = filePath;

          if (parts.length >= 4) {
            subject = parts[0];
            classVal = parts[1];
            year = parts[2];
            name = parts.slice(3).join('/');
          } else if (parts.length === 3) {
            subject = parts[0];
            classVal = parts[1];
            name = parts[2];
          } else if (parts.length === 2) {
            subject = parts[0];
            name = parts[1];
          }

          const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

          return {
            originalPath: filePath,
            name,
            subject: capitalize(subject),
            classVal: classVal.toUpperCase(),
            year: year,
          };
        });
        setFiles(parsedFiles);
      }
    } catch (err) {
      console.error('Failed to fetch files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: '', text: '' });

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('class', className);
    formData.append('year', year);
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadStatus({ type: 'success', text: 'Document uploaded successfully!' });
        setSubject('');
        setClassName('');
        setYear('');
        setFile(null);
        fetchFiles();
      } else {
        setUploadStatus({ type: 'error', text: `Upload failed: ${data.error || 'Server error'}` });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', text: 'Error connecting to upload server.' });
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filePath: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchFiles();
      } else {
        alert(`Error: ${data.error || 'Failed to delete file'}`);
      }
    } catch (err) {
      alert('Network error trying to delete file.');
      console.error(err);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return '📕';
      case 'doc':
      case 'docx': return '📘';
      case 'xls':
      case 'xlsx': return '📗';
      case 'ppt':
      case 'pptx': return '📙';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Admin Control Panel</h1>
            <p className={styles.subtitle}>Upload study materials and manage existing resource files.</p>
          </div>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Left Column: Upload Form */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Add New Document</h2>
            <form onSubmit={handleUploadSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Physics, Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Class / Grade</label>
                <input
                  type="text"
                  placeholder="e.g. 11, 12, Dropper"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2024, 2025"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Select File</label>
                <div className={styles.fileInputContainer}>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className={styles.fileInput}
                    required
                  />
                  <div className={styles.fileInputLabel}>
                    <span>📁</span>
                    <span>{file ? file.name : 'Click or Drag file to select'}</span>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={uploading} className={styles.uploadBtn}>
                {uploading ? 'Uploading...' : 'Publish Document'}
              </button>

              {uploadStatus.text && (
                <div className={`${styles.statusMessage} ${uploadStatus.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                  {uploadStatus.text}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Manage List */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Manage Documents ({files.length})</h2>
            {loading ? (
              <p className={styles.subtitle}>Loading files...</p>
            ) : (
              <div className={styles.documentList}>
                {files.length > 0 ? (
                  files.map((file, idx) => (
                    <div key={idx} className={styles.documentItem}>
                      <div className={styles.docInfo}>
                        <span className={styles.docIcon}>{getFileIcon(file.name)}</span>
                        <div className={styles.docDetails}>
                          <h3 className={styles.docName} title={file.name}>{file.name}</h3>
                          <div className={styles.docMeta}>
                            <span className={`${styles.badge} ${styles.badgeSubject}`}>{file.subject}</span>
                            <span className={`${styles.badge} ${styles.badgeClass}`}>Class {file.classVal}</span>
                            {file.year !== 'N/A' && (
                              <span className={`${styles.badge} ${styles.badgeYear}`}>{file.year}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(file.originalPath)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={styles.noDocs}>
                    <h3>No documents uploaded yet</h3>
                    <p>Use the form on the left to upload past papers or class notes.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
