interface WindowsEdgeIconProps {
   className?: string;
}

export function WindowsEdgeIcon({ className }: WindowsEdgeIconProps) {
   return <img src="/images/edge.png" alt="Windows Edge Icon" className={className} />;
}
