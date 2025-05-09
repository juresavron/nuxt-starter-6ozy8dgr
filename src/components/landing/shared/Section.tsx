import React, { forwardRef, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  hasTopGradient?: boolean;
  hasBottomGradient?: boolean;
  containerClassName?: string;
  withBackground?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children, className, innerClassName, hasTopGradient, hasBottomGradient, containerClassName, withBackground = true }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn('section-spacing relative overflow-hidden', className)}
      >
        {withBackground && (
          <>
            <div className="section-bg-gradient"></div>
            {hasTopGradient && (
              <div className="section-bg-radial-tl"></div>
            )}
            {hasBottomGradient && (
              <div className="section-bg-radial-br absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(60,100,255,0.08)_0%,transparent_60%)]"></div>
            )}
          </>
        )}
        <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10', containerClassName)}>
          <div className={innerClassName}>
            {children}
          </div>
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;