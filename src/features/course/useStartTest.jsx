import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import ConfirmDialog from '../../lib/ConfirmDialog';

// Starts a test, asking first if it would throw away one that's still running.
export default function useStartTest() {
  const { session, startTest } = useTest();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);

  function begin(config) {
    startTest(config);
    navigate('/test');
  }

  function start(config) {
    if (session && !session.submittedAt) setPending(config);
    else begin(config);
  }

  const dialog = (
    <ConfirmDialog
      open={!!pending}
      title="Replace your test in progress?"
      confirmLabel="Start new test"
      danger
      onConfirm={() => begin(pending)}
      onCancel={() => setPending(null)}
    >
      Your unfinished test ({session?.sections.map((s) => s.label).join(', ')}) and its answers will be discarded.
    </ConfirmDialog>
  );

  return { start, dialog };
}
