import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { studentAPI, subjectAPI, resultAPI } from '../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineUsers, HiOutlineBookOpen, HiOutlineDocumentText } from 'react-icons/hi';

const tabs = [
  { id: 'students', label: 'Students', icon: HiOutlineUsers },
  { id: 'subjects', label: 'Subjects', icon: HiOutlineBookOpen },
  { id: 'results', label: 'Results', icon: HiOutlineDocumentText },
];

const ManageResults = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'students') {
        const { data } = await studentAPI.getAll();
        if (data.success) setStudents(data.data);
      } else if (activeTab === 'subjects') {
        const { data } = await subjectAPI.getAll();
        if (data.success) setSubjects(data.data);
      } else {
        const { data } = await resultAPI.getAll();
        if (data.success) setResults(data.data);
        const sRes = await studentAPI.getAll();
        if (sRes.data.success) setStudents(sRes.data.data);
        const subRes = await subjectAPI.getAll();
        if (subRes.data.success) setSubjects(subRes.data.data);
      }
    } catch { toast.error('Failed to fetch data'); }
    finally { setLoading(false); }
  };

  const openAdd = () => {
    setEditingItem(null);
    if (activeTab === 'students') setFormData({ roll_number: '', name: '', email: '', phone: '', class: '', section: '' });
    else if (activeTab === 'subjects') setFormData({ subject_code: '', subject_name: '', total_marks: 100, passing_marks: 40 });
    else setFormData({ student_id: '', subject_id: '', marks_obtained: '', total_marks: 100, semester: 1 });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'students') setFormData({ roll_number: item.roll_number, name: item.name, email: item.email, phone: item.phone || '', class: item.class, section: item.section });
    else if (activeTab === 'subjects') setFormData({ subject_code: item.subject_code, subject_name: item.subject_name, total_marks: item.total_marks, passing_marks: item.passing_marks });
    else setFormData({ student_id: item.student_id?._id || '', subject_id: item.subject_id?._id || '', marks_obtained: item.marks_obtained, total_marks: item.total_marks, semester: item.semester });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const api = activeTab === 'students' ? studentAPI : activeTab === 'subjects' ? subjectAPI : resultAPI;
      await api.delete(id);
      toast.success('Deleted successfully');
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = activeTab === 'students' ? studentAPI : activeTab === 'subjects' ? subjectAPI : resultAPI;
      if (editingItem) {
        await api.update(editingItem._id, formData);
        toast.success('Updated successfully');
      } else {
        await api.create(formData);
        toast.success('Created successfully');
      }
      setShowModal(false);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleChange = (e) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const renderForm = () => {
    if (activeTab === 'students') return (
      <>
        <FormField label="Roll Number" name="roll_number" value={formData.roll_number} onChange={handleChange} placeholder="e.g. CS2024001" />
        <FormField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
        <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
        <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
        <FormField label="Class" name="class" value={formData.class} onChange={handleChange} placeholder="e.g. B.Tech CSE" />
        <FormField label="Section" name="section" value={formData.section} onChange={handleChange} placeholder="e.g. A" />
      </>
    );
    if (activeTab === 'subjects') return (
      <>
        <FormField label="Subject Code" name="subject_code" value={formData.subject_code} onChange={handleChange} placeholder="e.g. CS101" />
        <FormField label="Subject Name" name="subject_name" value={formData.subject_name} onChange={handleChange} placeholder="e.g. Data Structures" />
        <FormField label="Total Marks" name="total_marks" type="number" value={formData.total_marks} onChange={handleChange} />
        <FormField label="Passing Marks" name="passing_marks" type="number" value={formData.passing_marks} onChange={handleChange} />
      </>
    );
    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
          <select name="student_id" value={formData.student_id} onChange={handleChange} className="input-glass" required>
            <option value="" className="bg-dark-800">Select Student</option>
            {students.map(s => <option key={s._id} value={s._id} className="bg-dark-800">{s.name} ({s.roll_number})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
          <select name="subject_id" value={formData.subject_id} onChange={handleChange} className="input-glass" required>
            <option value="" className="bg-dark-800">Select Subject</option>
            {subjects.map(s => <option key={s._id} value={s._id} className="bg-dark-800">{s.subject_name} ({s.subject_code})</option>)}
          </select>
        </div>
        <FormField label="Marks Obtained" name="marks_obtained" type="number" value={formData.marks_obtained} onChange={handleChange} />
        <FormField label="Total Marks" name="total_marks" type="number" value={formData.total_marks} onChange={handleChange} />
        <FormField label="Semester" name="semester" type="number" value={formData.semester} onChange={handleChange} />
      </>
    );
  };

  const renderTable = () => {
    if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" /></div>;
    const items = activeTab === 'students' ? students : activeTab === 'subjects' ? subjects : results;
    if (!items.length) return <div className="glass-card text-center py-12"><p className="text-gray-400">No records found. Click "Add New" to create one.</p></div>;

    if (activeTab === 'students') return (
      <div className="overflow-x-auto"><table className="table-glass"><thead><tr><th>#</th><th>Roll No.</th><th>Name</th><th>Email</th><th>Class</th><th>Section</th><th>Actions</th></tr></thead><tbody>
        {students.map((s, i) => <tr key={s._id}><td className="text-gray-500">{i+1}</td><td className="font-mono text-accent-cyan text-sm">{s.roll_number}</td><td className="text-white font-medium">{s.name}</td><td className="text-gray-400 text-sm">{s.email}</td><td className="text-gray-300">{s.class}</td><td className="text-gray-300">{s.section}</td><td><div className="flex gap-2"><button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-400 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button><button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button></div></td></tr>)}
      </tbody></table></div>
    );
    if (activeTab === 'subjects') return (
      <div className="overflow-x-auto"><table className="table-glass"><thead><tr><th>#</th><th>Code</th><th>Name</th><th>Total Marks</th><th>Passing Marks</th><th>Actions</th></tr></thead><tbody>
        {subjects.map((s, i) => <tr key={s._id}><td className="text-gray-500">{i+1}</td><td className="font-mono text-accent-purple text-sm">{s.subject_code}</td><td className="text-white font-medium">{s.subject_name}</td><td className="text-gray-300">{s.total_marks}</td><td className="text-gray-300">{s.passing_marks}</td><td><div className="flex gap-2"><button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-400 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button><button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button></div></td></tr>)}
      </tbody></table></div>
    );
    return (
      <div className="overflow-x-auto"><table className="table-glass"><thead><tr><th>#</th><th>Student</th><th>Subject</th><th>Marks</th><th>Grade</th><th>Status</th><th>Sem</th><th>Actions</th></tr></thead><tbody>
        {results.map((r, i) => <tr key={r._id}><td className="text-gray-500">{i+1}</td><td><span className="text-white text-sm">{r.student_id?.name}</span><br/><span className="text-xs text-gray-500 font-mono">{r.student_id?.roll_number}</span></td><td><span className="text-gray-300 text-sm">{r.subject_id?.subject_name}</span><br/><span className="text-xs text-gray-500 font-mono">{r.subject_id?.subject_code}</span></td><td className="text-white font-semibold">{r.marks_obtained}/{r.total_marks}</td><td><span className={`grade-badge ${r.grade === 'A+' ? 'grade-a-plus' : r.grade === 'A' ? 'grade-a' : r.grade === 'B+' ? 'grade-b-plus' : r.grade === 'B' ? 'grade-b' : r.grade === 'C' ? 'grade-c' : 'grade-f'}`}>{r.grade}</span></td><td><span className={r.status === 'Pass' ? 'status-pass' : 'status-fail'}>{r.status}</span></td><td className="text-gray-300">{r.semester}</td><td><div className="flex gap-2"><button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-400 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button><button onClick={() => handleDelete(r._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button></div></td></tr>)}
      </tbody></table></div>
    );
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Manage <span className="gradient-text">Records</span></h1>
            <p className="text-gray-400 mt-1">Add, update, or delete students, subjects, and results</p>
          </div>
          <button onClick={openAdd} className="btn-gradient flex items-center gap-2"><HiOutlinePlus className="w-5 h-5" />Add New</button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl bg-dark-800/50 border border-white/10 w-fit">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-primary text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {renderTable()}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card !p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }} />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-white">{editingItem ? 'Edit' : 'Add'} {activeTab === 'students' ? 'Student' : activeTab === 'subjects' ? 'Subject' : 'Result'}</h2>
                  <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors"><HiOutlineX className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderForm()}
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="btn-gradient flex-1">{editingItem ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="input-glass" required />
  </div>
);

export default ManageResults;
