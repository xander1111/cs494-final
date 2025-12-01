import { SvgIcon, SvgIconProps } from '@mui/material';

export function CornerGridIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            {/* Top-left corner - filled */}
            <rect x="2.5" y="2.5" width="5.5" height="5.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
            {/* Top-center - outline */}
            <rect x="9.25" y="2.5" width="5.5" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Top-right corner - filled */}
            <rect x="16" y="2.5" width="5.5" height="5.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
            
            {/* Middle-left - outline */}
            <rect x="2.5" y="9.25" width="5.5" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Center - outline */}
            <rect x="9.25" y="9.25" width="5.5" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Middle-right - outline */}
            <rect x="16" y="9.25" width="5.5" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Bottom-left corner - filled */}
            <rect x="2.5" y="16" width="5.5" height="5.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
            {/* Bottom-center - outline */}
            <rect x="9.25" y="16" width="5.5" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Bottom-right corner - filled */}
            <rect x="16" y="16" width="5.5" height="5.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </SvgIcon>
    );
}
