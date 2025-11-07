import React from 'react';

export interface Tool {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}