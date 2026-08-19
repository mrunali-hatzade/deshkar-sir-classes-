'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './Resources.module.css';

interface ResourceFile {
  originalPath: string;
  name: string;
  subject: string;
  classVal: string;
  year: string;
  downloadUrl: string;
}

export default function ResourcesPage() {
  const [files, setFiles] = useState<ResourceFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    async function fetchFiles() {
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

            // Capitalize helpers
            const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

            return {
              originalPath: filePath,
              name,
              subject: capitalize(subject),
              classVal: classVal.toUpperCase(),
              year: year,
              downloadUrl: `/uploads/${filePath}`,
            };
          });
          setFiles(parsedFiles);
        }
      } catch (err) {
        console.error('Failed to fetch files:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  // Compute unique values for filter dropdowns
  const subjects = Array.from(new Set(files.map((f) => f.subject)));
  const classes = Array.from(new Set(files.map((f) => f.classVal)));
  const years = Array.from(new Set(files.map((f) => f.year))).filter((y) => y !== 'N/A');

  // Filter files
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === '' || file.subject === selectedSubject;
    const matchesClass = selectedClass === '' || file.classVal === selectedClass;
    const matchesYear = selectedYear === '' || file.year === selectedYear;
    return matchesSearch && matchesSubject && matchesClass && matchesYear;
  });

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📕';
      case 'doc':
      case 'docx':
        return '📘';
      case 'xls':
      case 'xlsx':
        return '📗';
      case 'ppt':
      case 'pptx':
        return '📙';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        return '🖼️';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📄';
    }
  };

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Study Materials & Past Papers</h1>
          <p className={styles.subtitle}>Access all class resources, question papers, and notes uploaded by teachers.</p>
        </div>

        {/* Filters */}
        <div className={styles.filterSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="search">Search Papers</label>
            <input
              id="search"
              type="text"
              placeholder="Search by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={styles.select}
            >
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="class">Class</label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={styles.select}
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.select}
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading / Results Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className={styles.subtitle}>Loading resources...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, idx) => (
                <div key={idx} className={styles.card}>
                  <div>
                    <div className={styles.fileIcon}>{getFileIcon(file.name)}</div>
                    <div className={styles.fileInfo}>
                      <h3 className={styles.fileName}>{file.name}</h3>
                      <div className={styles.metaTags}>
                        <span className={`${styles.tag} ${styles.tagSubject}`}>{file.subject}</span>
                        <span className={`${styles.tag} ${styles.tagClass}`}>Class {file.classVal}</span>
                        {file.year !== 'N/A' && (
                          <span className={`${styles.tag} ${styles.tagYear}`}>{file.year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href={file.downloadUrl}
                    download={file.name}
                    className={styles.downloadBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Download File</span>
                    <span>📥</span>
                  </a>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No materials found</h3>
                <p>Try resetting the filters or searching for something else.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
