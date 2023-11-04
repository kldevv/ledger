import { Button } from '@/components/view';
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  return (
    <div>
      <Button onClick={() => console.log('123')}>{'hello'}</Button>
    </div>
  );
}
