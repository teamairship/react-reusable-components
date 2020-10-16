import React from 'react';
import { v4 as uuid } from 'uuid';

export default function useUuid(id: string | number): string {
  const [_id, _setId] = React.useState<string>((id || '').toString());
  React.useEffect(() => {
    _setId((id || uuid()).toString());
  }, [id]);

  if (id) return id.toString();

  return _id;
}
