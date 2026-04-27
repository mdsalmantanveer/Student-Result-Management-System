import { motion } from 'framer-motion';

const getGradeClass = (grade) => {
  const map = {
    'A+': 'grade-a-plus',
    A: 'grade-a',
    'B+': 'grade-b-plus',
    B: 'grade-b',
    C: 'grade-c',
    F: 'grade-f',
  };
  return map[grade] || 'grade-c';
};

const ResultsTable = ({ results, showStudent = false }) => {
  if (!results || results.length === 0) {
    return (
      <div className="glass-card text-center py-12">
        <p className="text-gray-400 text-lg">No results found</p>
        <p className="text-gray-500 text-sm mt-2">
          Try searching with a different roll number or semester
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <table className="table-glass" id="results-table">
        <thead>
          <tr>
            <th>#</th>
            {showStudent && <th>Student</th>}
            {showStudent && <th>Roll No.</th>}
            <th>Subject</th>
            <th>Code</th>
            <th>Marks</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const percentage = (
              (result.marks_obtained / result.total_marks) *
              100
            ).toFixed(1);

            return (
              <motion.tr
                key={result._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="text-gray-500 font-mono">{index + 1}</td>
                {showStudent && (
                  <td className="font-medium text-white">
                    {result.student_id?.name || 'N/A'}
                  </td>
                )}
                {showStudent && (
                  <td className="font-mono text-accent-cyan text-xs">
                    {result.student_id?.roll_number || 'N/A'}
                  </td>
                )}
                <td className="text-gray-300">
                  {result.subject_id?.subject_name || 'N/A'}
                </td>
                <td className="font-mono text-gray-400 text-xs">
                  {result.subject_id?.subject_code || 'N/A'}
                </td>
                <td className="font-semibold text-white">
                  {result.marks_obtained}
                </td>
                <td className="text-gray-400">{result.total_marks}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          background:
                            percentage >= 50
                              ? 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
                              : 'linear-gradient(90deg, #ef4444, #f97316)',
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{percentage}%</span>
                  </div>
                </td>
                <td>
                  <span className={`grade-badge ${getGradeClass(result.grade)}`}>
                    {result.grade}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      result.status === 'Pass' ? 'status-pass' : 'status-fail'
                    }
                  >
                    {result.status}
                  </span>
                </td>
                <td className="text-center">
                  <span className="bg-dark-700 px-2 py-1 rounded-md text-xs text-gray-300">
                    Sem {result.semester}
                  </span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ResultsTable;
